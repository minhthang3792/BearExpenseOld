import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Datepicker, Input } from "@ui-kitten/components";
import { FlexRowView } from "../../components/Theme/FlexRowView";
import { ThemedAwesomeText } from "../../components/Theme/AwesomeText";
import { FlexContainerView } from "../../components/Theme/FlexContainerView";
import { FlexColumnView } from "../../components/Theme/FlexColumnView";
import BearIcon from "../../components/Theme/BearIcon";
import TransactionEntity from "../../lib/entities/TransactionEntity";
import { ToastUtil } from "../../common/ToastUtil";

export default function InputScreen() {
  const [type, setType] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState<string>();
  const [note, setNote] = useState<string>();

  useEffect(() => {});

  const onSubmit = async () => {
    const input = {
      type,
      date,
      amount,
      note,
    };

    TransactionEntity.create(input).then(() =>
      ToastUtil.show(ToastUtil.SUCCESS, "Create transaction success")
    );

    // const options = {
    //   columns: "id, type, date, amount, note",
    //   page: 1,
    //   limit: 30,
    //   order: "id ASC",
    // };
    // TransactionEntity.query().then(console.log);
  };

  return (
    <FlexContainerView>
      <FlexRowView style={styles.row}>
        <FlexColumnView style={styles.labelColumn}>
          <ThemedAwesomeText>Date</ThemedAwesomeText>
        </FlexColumnView>
        <FlexColumnView style={styles.inputColumn}>
          <Datepicker
            placeholder="Pick Date"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryRight={<BearIcon name="calendar" />}
          />
        </FlexColumnView>
      </FlexRowView>

      <FlexRowView style={styles.row}>
        <FlexColumnView style={styles.labelColumn}>
          <ThemedAwesomeText>Note</ThemedAwesomeText>
        </FlexColumnView>
        <FlexColumnView style={styles.inputColumn}>
          <Input
            style={styles.noteInput}
            placeholder={"Note here..."}
            value={note}
            onChangeText={(value) => setNote(value)}
          />
        </FlexColumnView>
      </FlexRowView>

      <FlexRowView style={styles.row}>
        <FlexColumnView style={styles.labelColumn}>
          <ThemedAwesomeText>Expense</ThemedAwesomeText>
        </FlexColumnView>
        <FlexColumnView style={styles.inputColumn}>
          <Input
            keyboardType="numeric"
            value={amount}
            onChangeText={(value) => setAmount(value)}
          />
        </FlexColumnView>
      </FlexRowView>

      <FlexRowView style={{ alignSelf: "center" }}>
        <BearIcon name="facebook" />
      </FlexRowView>

      <FlexRowView style={{ alignSelf: "center" }}>
        <Button style={styles.button} status="info" onPress={onSubmit}>
          SUBMIT
        </Button>
      </FlexRowView>
    </FlexContainerView>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
  },
  labelColumn: {
    width: "25%",
  },
  inputColumn: {
    width: "75%",
  },
  noteInput: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  button: {
    width: "90%",
    borderRadius: 20,
  },
});
