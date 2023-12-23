// components/KanbanBoard.js
import React from 'react';

const KanbanBoard = ({ groupingOption, orderingOption, isDarkMode, data }) => {
  const getGroupedAndSortedTickets = () => {
    const groupedTickets = {};

    if (groupingOption === 'status') {
      const allStatuses = [...new Set(data.tickets.map((ticket) => ticket.status)), 'Done', 'Cancelled'];
      allStatuses.forEach((status) => {
        groupedTickets[status] = data.tickets.filter((ticket) => ticket.status === status);
      });
    } else if (groupingOption === 'priority') {
      data.tickets.forEach((ticket) => {
        // Mapping priority to groupKey based on your requirements
        const priorityMapping = {
          4: 'Urgent',
          3: 'High',
          2: 'Medium',
          1: 'Low', 
          0: 'No priority',
        };

        const groupKey = priorityMapping[ticket.priority];
        if (!groupedTickets[groupKey]) {
          groupedTickets[groupKey] = [];
        }
        groupedTickets[groupKey].push(ticket);
      });
    } else if (groupingOption === 'user') {
      data.users.forEach((user) => {
        const userTickets = data.tickets.filter((ticket) => ticket.userId === user.id);
        const groupKey = user.name;
        if (!groupedTickets[groupKey]) {
          groupedTickets[groupKey] = [];
        }
        groupedTickets[groupKey].push(...userTickets);
      });
    }

    return groupedTickets;
  };

  const groupedAndSortedTickets = getGroupedAndSortedTickets();

  const getSortedTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (orderingOption === 'priority') {
        return b.priority - a.priority;
      } else if (orderingOption === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return 0;
      }
    });
  };

  return (
    <div className={`bg-${isDarkMode ? 'black' : 'white'} text-${isDarkMode ? 'white' : 'black'} p-4 min-h-screen`}>
      <div className="flex flex-wrap justify-start">
        {Object.keys(groupedAndSortedTickets).map((groupKey, index) => (
          <div
            key={groupKey}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 rounded-md shadow-md mb-4 ${index !== 0 ? 'md:ml-4 lg:ml-4 xl:ml-4' : ''}`}
          >
            <h3 className="text-md font-semibold mb-2">{groupKey}</h3>
            {getSortedTickets(groupedAndSortedTickets[groupKey]).map((ticket) => (
              <div key={ticket.id} className={`border p-3 mt-2 rounded-md shadow-sm ${isDarkMode ? 'text-white bg-gray-800' : 'text-black bg-white'}`}>
                <h4 className="text-base font-medium mb-1">{ticket.title}</h4>
                <p className="text-xs">
                  <span className="mr-1">Status:</span>
                  {ticket.status === 'Done' ? 'Done' : ticket.status === 'Cancelled' ? 'Cancelled' : ticket.status}
                </p>
                <p className="text-xs">
                  <span className="mr-1">Priority:</span>
                  {ticket.priority === 4 ? 'Urgent' : ticket.priority === 3 ? 'High' : ticket.priority === 2 ? 'Medium' : ticket.priority === 1 ? 'Low' : ticket.priority === 0 ? 'No priority' : ''}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
