import styled from 'styled-components';

export default function AddSEL () {
  async function handleAddSEL () {
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: '0x372a410b50DA68144b8666Fa351FD38DFb0E1C37', // The address that the token is at.
            symbol: 'SEL', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: 'https://user-images.githubusercontent.com/38589050/149439179-f287a574-b153-45e6-a96c-1a3c9adc36d0.png' // A string url of the token logo
          }
        }
      });
      console.log(wasAdded);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <Text onClick={handleAddSEL}>Add SEL Token</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 1rem;
`;
const Text = styled.button`
  font-weight: 500;
  font-size: 14px;
  background: #2d6cdf;
  border-radius: 4px;
  border: none;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
