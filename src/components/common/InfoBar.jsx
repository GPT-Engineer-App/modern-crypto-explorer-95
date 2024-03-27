import { Box, Text, Icon } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const InfoBar = ({ assets, previousDayTotalMarketCap }) => {
  if (!assets || !assets.length) {
    return <Box>Loading data...</Box>;
  }

  const calculateDominance = (assetSymbol) => {
    const totalMarketCap = assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0);
    const asset = assets.find(a => a.symbol === assetSymbol);
    return asset ? ((parseFloat(asset.marketCapUsd) / totalMarketCap) * 100).toFixed(2) : '0';
  };

  const calculateTotalVolume = () => {
    const totalVolume = assets.reduce((acc, asset) => acc + parseFloat(asset.volumeUsd24Hr || 0), 0);
    return (totalVolume / 1e9).toFixed(2); // Convert to billions
  };

  const calculateTotalMarketCap = () => {
    return assets.reduce((acc, asset) => acc + parseFloat(asset.marketCapUsd || 0), 0) / 1e12; // Convert to trillions
  };

  const totalMarketCap = calculateTotalMarketCap();
  const marketDirection = totalMarketCap > previousDayTotalMarketCap ? 'up' : 'down';

  const btcDominance = calculateDominance('BTC');
  const ethDominance = calculateDominance('ETH');
  const totalVolume = calculateTotalVolume();

  return (
    <Box bg="gray.800" py={2} px={4}>
      <Text color="white" textAlign="left" fontSize="sm">
        Dominance: <Text as="span" fontWeight="bold">BTC</Text> {btcDominance}%&nbsp;&nbsp;&nbsp;
        <Text as="span" fontWeight="bold">ETH</Text> {ethDominance}%&nbsp;&nbsp;&nbsp;
        24h Vol: <Text as="span" fontWeight="bold">${totalVolume} Billion</Text>&nbsp;&nbsp;&nbsp;
        Total Market Cap: 
        <Text as="span" fontWeight="bold">${totalMarketCap.toFixed(2)} Trillion </Text>
        {marketDirection === 'up' ? (
          <Icon as={FaArrowUp} color="green.500" />
        ) : (
          <Icon as={FaArrowDown} color="red.500" />
        )}
      </Text>
    </Box>
  );
};

export default InfoBar;
