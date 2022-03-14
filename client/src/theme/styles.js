const styles = {
  global: props => ({
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    '.wrapper': {
      display: 'flex',
      flexFlow: 'row wrap',
      alignContent: 'flex-start',
      height: '100%',
    },
    '.wrapper > *': {
      flex: '1 100%',
    },
    '*::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: '#CBD5E0',
    },
    '*::-webkit-scrollbar-thumb': {
      background: '#718096',
      borderRadius: '5px',
    },
    '*::-webkit-scrollbar-track': {
      borderRadius: '5px',
    },
    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: '#2D3748 #CBD5E0',
    },
  }),
};

export default styles;
