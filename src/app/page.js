"use client"
// components/Page.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import KanbanBoard from '@/components/Kanbanboard';

const Page = () => {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [groupingOption, setGroupingOption] = useState('status');
  const [orderingOption, setOrderingOption] = useState('priority');
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleOrderingChange = (option) => {
    setOrderingOption(option);
  };

  const handleThemeToggle = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div>
      {/* NavigationBar Component */}
      <NavigationBar
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
        onThemeToggle={handleThemeToggle}
        isNightMode={isNightMode}
      />

      {/* KanbanBoard Component */}
      <KanbanBoard
        groupingOption={groupingOption}
        orderingOption={orderingOption}
        isDarkMode={isNightMode}
        data={data}
      />
    </div>
  );
};

export default Page;
