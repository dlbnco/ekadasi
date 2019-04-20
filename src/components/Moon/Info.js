import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import Text from '../Text';
import { format, isSameDay, isTomorrow, startOfDay, endOfDay } from 'date-fns';
import MoonCircle from './Circle';
import Ekadasi from '../Ekadasi';
import Geo from '../Geo';
import AddToCalendar from '../AddToCalendar';

const MoonInfo = ({ date }) => {
  return (
    <Geo>
      {({ geo }) => (
        <Ekadasi date={date} geo={geo}>
          {({ nextEkadasi, ekadasis }) => (
            <Flex flexDirection="column" alignItems="center">
              <MoonCircle size={240} date={date} mb={4} />
              <Box mb={[3, 4]}>
                <Text
                  textAlign="center"
                  fontSize={4}
                  as="time"
                  dateTime={date.toISOString()}
                >
                  {format(date, 'DD MMM YYYY')}
                </Text>
                {ekadasis.some(_date => isSameDay(date, _date)) && (
                  <Text textAlign="center">Today is Ekadashi day 🌝</Text>
                )}
                <Text textAlign="center" fontSize={4}>
                  –
                </Text>
              </Box>
              <Flex flexDirection="column" alignItems="center">
                <Text fontSize={3} variant="secondary">
                  Next Ekadashi
                </Text>
                {isTomorrow(nextEkadasi) && (
                  <Text
                    fontSize={5}
                    as="time"
                    dateTime={nextEkadasi.toISOString()}
                  >
                    Tomorrow
                  </Text>
                )}
                <Text
                  fontSize={5}
                  as="time"
                  dateTime={nextEkadasi.toISOString()}
                >
                  {format(nextEkadasi, 'dddd, DD MMM')}
                </Text>
                <Box my={[3, 4]}>
                  <AddToCalendar
                    displayItemIcons={false}
                    event={{
                      title: 'Ekadashi day',
                      description: '',
                      location: '',
                      startTime: startOfDay(nextEkadasi),
                      endTime: endOfDay(nextEkadasi),
                    }}
                  />
                </Box>
                <Text variant="secondary" my={3}>
                  Dates may vary
                </Text>
              </Flex>
            </Flex>
          )}
        </Ekadasi>
      )}
    </Geo>
  );
};

MoonInfo.propTypes = {
  date: PropTypes.object,
};

MoonInfo.defaultProps = {
  date: new Date(),
};

export default MoonInfo;
