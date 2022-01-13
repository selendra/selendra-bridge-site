import Select from 'react-select';

export default function SelectComponent ({ options, onChange }) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid pink',
      color: state.isSelected ? 'white' : '#482ff7',
      padding: 14
    })
  };

  return (
    <Select options={options} onChange={onChange} styles={customStyles} />
  );
}
