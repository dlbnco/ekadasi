import React from 'react';
import MoonPhase from '.';
import { Flex } from 'rebass';
import Text from '../Text';
import { format, addDays } from 'date-fns';
import MoonCircle from './Circle';

const MoonInfo = () => {
  return (
    <MoonPhase>
      {({ moon, hunt }) => {
        const nextEkadasi = addDays(hunt().new_date, 11);
        return (
          <Flex flexDirection="column" alignItems="center">
            <MoonCircle size={240} moon={moon()} mb={4} />
            <Text fontSize={4} mb={[4, 5]}>
              {format(new Date(), 'DD MMM YYYY')}
            </Text>
            <Flex flexDirection="column" alignItems="center">
              <Text fontSize={3} variant="secondary">
                Next Ekadashi
              </Text>
              <Text fontSize={4}>{format(nextEkadasi, 'DD MMM')}</Text>
            </Flex>
          </Flex>
        );
      }}
    </MoonPhase>
  );
};

export default MoonInfo;
