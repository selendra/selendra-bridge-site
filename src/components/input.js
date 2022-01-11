import styled from 'styled-components';

export default function Input ({ value, onChange, placeholder, type }) {
  return (
    <InputStyled
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

const InputStyled = styled.input`
  width: 100%;
  height: 2.5rem;
  font-size: 14px;
  color: #FFF;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: none;
  border-radius: 8px;
  outline: none;
  padding: 8px 10px;
`;
