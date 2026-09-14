import { StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { format, parseISO } from "date-fns";

import type { Entry } from "../types/entry";

type HistoryListProps = {
  entries: Entry[];
};

export default function HistoryList({ entries }: HistoryListProps) {
  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1));

  const currentMonth = format(new Date(), "yyyy-MM");
  const monthlyTotal = entries
    .filter((entry) => entry.date.startsWith(currentMonth))
    .reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <View>
      <Text variant="labelLarge" style={styles.total}>
        {`This month: ${monthlyTotal}L`}
      </Text>
      {sorted.map((entry) => (
        <List.Item
          key={entry.id}
          title={format(parseISO(entry.date), "EEE, d MMM yyyy")}
          description={`${entry.quantity} L`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  total: {
    marginBottom: 8,
    marginLeft: 4,
  },
});
