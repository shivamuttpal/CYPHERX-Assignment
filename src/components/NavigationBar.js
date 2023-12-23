// components/NavigationBar.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const NavigationBar = ({ onGroupingChange, onOrderingChange, onThemeToggle, isNightMode }) => {
  const [open, setOpen] = React.useState(false);
  const [groupingOption, setGroupingOption] = React.useState('');
  const [orderingOption, setOrderingOption] = React.useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = (event, type) => {
    if (type === 'grouping') {
      setGroupingOption(event.target.value);
      onGroupingChange(event.target.value);
    } else if (type === 'ordering') {
      setOrderingOption(event.target.value);
      onOrderingChange(event.target.value);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    onThemeToggle();
  };

  return (
    <nav className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} p-4 flex justify-between items-center`}>
      {/* Display Dropdown on the left */}
      <Button className={`text-${isDarkMode ? 'white' : 'black'}`} onClick={handleClickOpen}>
        Display
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Display Options</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="grouping-select">Grouping</InputLabel>
              <Select
                native
                value={groupingOption}
                onChange={(e) => handleChange(e, 'grouping')}
                input={<OutlinedInput label="Grouping" id="grouping-select" />}
              >
                <option aria-label="None" value="" />
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="ordering-select">Ordering</InputLabel>
              <Select
                native
                value={orderingOption}
                onChange={(e) => handleChange(e, 'ordering')}
                input={<OutlinedInput label="Ordering" id="ordering-select" />}
              >
                <option aria-label="None" value="" />
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>

      {/* Theme toggle on the right */}
      <div className={`text-${isDarkMode ? 'white' : 'black'}`}>
        <label className="mr-2">Theme:</label>
        <label className="switch">
          <input type="checkbox" onChange={handleThemeToggle} checked={isDarkMode} />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
};

export default NavigationBar;
