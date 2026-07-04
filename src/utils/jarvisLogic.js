export const processCommand = (cmd) => {
  if (cmd.includes('hello') || cmd.includes('jarvis')) {
    return {
      speech: 'Hello, Hari. What project are we focusing on today?',
      log: 'Hello, Hari. What project are we focusing on today?',
    };
  } else if (cmd.includes('status') || cmd.includes('report')) {
    return {
      speech: 'Core temperature nominal, Hari. Power grids are stabilized at one hundred percent.',
      log: 'Core temperature nominal. Power grids stabilized at one hundred percent.',
    };
  } else if (cmd.includes('time')) {
    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return {
      speech: `It is currently ${now}, sir.`,
      log: `Current time: ${now}`,
    };
  } else if (cmd.includes('clear')) {
    return {
      speech: 'Terminal cache flushed.',
      log: 'Cache flushed. Terminal clear.',
    };
  } else if (cmd.includes('power') || cmd.includes('energy')) {
    return {
      speech: 'Power systems at maximum capacity. All reactors running smoothly.',
      log: 'Power systems at maximum capacity.',
    };
  } else if (cmd.includes('thanks') || cmd.includes('thank you')) {
    return {
      speech: 'At your service, sir.',
      log: 'At your service, sir.',
    };
  } else {
    return {
      speech: 'Command logged, Hari, but data arrays require further integration to execute.',
      log: 'Command logged. Data arrays require further integration.',
    };
  }
};
