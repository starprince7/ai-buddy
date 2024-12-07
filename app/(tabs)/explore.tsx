import { StyleSheet, Image, Platform, useWindowDimensions } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import RenderHTML from "react-native-render-html";

export default function TabTwoScreen() {
  const { width } = useWindowDimensions();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      {/* Render HTML here */}
      <ThemedView style={{ backgroundColor: "#cccc", padding: 10 }}>
        <RenderHTML
          source={{ html: generateHTML() }}
          contentWidth={width - 20}
        />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          and{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
          in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the{" "}
          <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
          provide files for different screen densities
        </ThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
          to see how to load{" "}
          <ThemedText style={{ fontFamily: "SpaceMono" }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{" "}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook
          lets you inspect what the user's current color scheme is, and so you
          can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{" "}
          <ThemedText type="defaultSemiBold">
            components/HelloWave.tsx
          </ThemedText>{" "}
          component uses the powerful{" "}
          <ThemedText type="defaultSemiBold">
            react-native-reanimated
          </ThemedText>{" "}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The{" "}
              <ThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ThemedText>{" "}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

const generateHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proforma Invoice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    .container {
      border: 1px solid #ccc;
      padding: 20px;
      max-width: 800px;
      margin: auto;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 5px 0;
    }
    .header .reference {
      font-weight: bold;
    }
    .section {
      margin-bottom: 20px;
    }
    .section h2 {
      font-size: 18px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
    .field {
      margin: 5px 0;
    }
    .field label {
      font-weight: bold;
    }
    .field span {
      margin-left: 10px;
    }
    .table-container {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f9f9f9;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="reference">Bill of Landing Number: <strong>PZ331409076FR</strong></p>
      <h1>Proforma Invoice</h1>
      <p>FREE OF CHARGE | NO COMMERCIAL VALUE | VALUE FOR CUSTOMS PURPOSES ONLY</p>
    </div>
    <div class="section">
      <h2>Shipper/Exporter Information</h2>
      <div class="field"><label>Name:</label> <span>Pooja Robin</span></div>
      <div class="field"><label>Address:</label> <span>189 avenue Aristide briand 94230 Cachan France</span></div>
      <div class="field"><label>Phone:</label> <span>+33745404431</span></div>
      <div class="field"><label>Email:</label> <span>preeti89@yahoo.com</span></div>
    </div>
    <div class="section">
      <h2>Consignee Information</h2>
      <div class="field"><label>Name:</label> <span>Preeti</span></div>
      <div class="field"><label>Address:</label> <span>C/O: Robin Singh, Village chatha Gobindpura, tehsil moonak, chatha gobindpura, sangrur, Punjab, 148001</span></div>
      <div class="field"><label>Phone:</label> <span>+919307241851</span></div>
      <div class="field"><label>Email:</label> <span>preeti89@yahoo.com</span></div>
    </div>
    <div class="section">
      <h2>Goods Details</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No. of Packages</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Unit Value</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>One big size ladies leather hand bag white with brown combination</td>
              <td>1</td>
              <td>1.9kg</td>
              <td>72 EUR</td>
              <td>72 EUR</td>
            </tr>
            <tr>
              <td>2</td>
              <td>One pair of mini size leather ladies hand bag white colour</td>
              <td>1</td>
              <td>1.6kg</td>
              <td>70 EUR</td>
              <td>70 EUR</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Hand made beauty pageant celebration gown off-white colour</td>
              <td>1</td>
              <td>2.2kg</td>
              <td>129 EUR</td>
              <td>129 EUR</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="text-align: right;"><strong>Total Weight</strong></td>
              <td colspan="2"><strong>5.7kg</strong></td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right;"><strong>Total Invoice Value</strong></td>
              <td colspan="2"><strong>271 EUR</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="footer">
      <p>Exporter Signature: Pooja Robin</p>
      <p>Date: 02/12/2024</p>
    </div>
  </div>
</body>
</html>
`;
