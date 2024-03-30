import toast from 'react-hot-toast';

// Exporting a named function
export const toasting = (name,icon) => {
  toast(`You started following ${name}`, {
    icon: icon,
    style: {
      borderRadius: '5px',
      background: '#333',
      color: '#fff',
      fontSize: '10px',
      fontWeight: '100',
      padding: '5px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
  });
};
