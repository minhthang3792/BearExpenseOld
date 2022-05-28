import React, { useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

const finderWidth: number = 280;
const finderHeight: number = 230;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function BarCodeScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      // @ts-ignore
      const { x, y } = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      }
    }
  };

  if (hasPermission === null) {
    return <text>Requesting for camera permission</text>;
  }
  if (hasPermission === false) {
    return <text>No access to camera</text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <BarcodeMask
          width={280}
          height={230}
          showAnimatedLine={false}
          outerMaskOpacity={0.8}
        />
        {scanned ? (
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        ) : null}
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
