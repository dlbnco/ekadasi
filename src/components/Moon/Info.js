import React from 'react';
import PropTypes from 'prop-types';
import MoonPhase from '.';
import { Flex } from 'rebass';

import Text from '../Text';
import { format } from 'date-fns';
import MoonCircle from './Circle';
import Ekadasi from '../Ekadasi';
import Geo from '../Geo';

const MoonInfo = ({ date }) => {
  return (
    <MoonPhase date={date}>
      {({ moon }) => {
        return (
          <Flex flexDirection="column" alignItems="center">
            <MoonCircle size={240} moon={moon(date)} mb={4} />
            <Text fontSize={4} mb={[4, 5]}>
              {format(date, 'DD MMM YYYY')}
            </Text>
            <Flex flexDirection="column" alignItems="center">
              <Text fontSize={3} variant="secondary">
                Next Ekadashi
              </Text>
              <Geo>
                {({ geo }) => (
                  <Ekadasi date={date} geo={geo}>
                    {({ nextEkadasi }) => (
                      <Text fontSize={4}>
                        {format(nextEkadasi, 'dddd, DD MMM')}
                      </Text>
                    )}
                  </Ekadasi>
                )}
              </Geo>
            </Flex>
          </Flex>
        );
      }}
    </MoonPhase>
  );
};

MoonInfo.propTypes = {
  date: PropTypes.object,
};

MoonInfo.defaultProps = {
  date: new Date(),
};

export default MoonInfo;
