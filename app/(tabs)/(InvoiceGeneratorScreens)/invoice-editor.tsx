import React, { useState, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import DynamicDocumentInput from "@/components/DynamicInputsFromDocument";
import InvoiceDataJsonTransformed from "@/data/transformed-proforma-data.json";
import { Link } from "expo-router";

type DocumentField = {
  name: string;
  label: string;
  type: string;
  value: any;
  required: boolean;
  group: string;
};

export default function ProformaInvoiceEditor() {
  const webViewRef = useRef(null);
  const [invoiceData, setInvoiceData] = useState<DocumentField[]>([]);

  const generateHTML = () => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          font-size: 10pt;
          line-height: 1.6;
        }
        [contenteditable="true"] {
          border-bottom: 2px dashed #3498db;
          min-width: 50px;
          display: inline-block;
        }
        [contenteditable="true"]:focus {
          outline: none;
          background-color: #f9f9f9;
        }
        .invoice-container {
          border: 1px solid #000;
          padding: 15px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .tracking-info, .party-details, .country-info, .optional-info {
          margin-bottom: 15px;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
        }
        .items-table th, .items-table td {
          border: 1px solid #000;
          padding: 5px;
        }
        .add-item-btn {
          background-color: #2ecc71;
          color: white;
          border: none;
          padding: 10px;
          margin-top: 10px;
          cursor: pointer;
        }
        .delete-item-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 5px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <h1>Proforma Invoice</h1>
          <div>FREE OF CHARGE - NO COMMERCIAL VALUE - VALUE FOR CUSTOMS PURPOSES ONLY</div>
        </div>

        <div class="tracking-info">
          <div>
            <strong>Bill of Lading Number:</strong> 
            <span id="bill-of-lading" contenteditable="true">${
              invoiceData.trackingInfo.billOfLadingNumber
            }</span>
          </div>
          <div>
            <strong>Chronopost Reference:</strong> 
            <span id="chronopost-ref" contenteditable="true">${
              invoiceData.trackingInfo.chronopostReference
            }</span>
          </div>
        </div>

        <div class="party-details">
          <div>
            <h3>Shipper/Exporter</h3>
            <div><strong>Name:</strong> <span id="shipper-name" contenteditable="true">${
              invoiceData.shipper.name
            }</span></div>
            <div><strong>Address:</strong> <span id="shipper-address" contenteditable="true">${
              invoiceData.shipper.address
            }</span></div>
            <div><strong>Phone:</strong> <span id="shipper-phone" contenteditable="true">${
              invoiceData.shipper.phone
            }</span></div>
            <div><strong>Email:</strong> <span id="shipper-email" contenteditable="true">${
              invoiceData.shipper.email
            }</span></div>
          </div>

          <div>
            <h3>Consignee</h3>
            <div><strong>Name:</strong> <span id="consignee-name" contenteditable="true">${
              invoiceData.consignee.name
            }</span></div>
            <div><strong>Address:</strong> <span id="consignee-address" contenteditable="true">${
              invoiceData.consignee.address
            }</span></div>
            <div><strong>Phone:</strong> <span id="consignee-phone" contenteditable="true">${
              invoiceData.consignee.phone
            }</span></div>
            <div><strong>Email:</strong> <span id="consignee-email" contenteditable="true">${
              invoiceData.consignee.email
            }</span></div>
          </div>
        </div>

        <div class="country-info">
          <div>
            <strong>Country of Export:</strong> 
            <span id="export-country" contenteditable="true">${
              invoiceData.countryInfo.export
            }</span>
          </div>
          <div>
            <strong>Country of Destination:</strong> 
            <span id="destination-country" contenteditable="true">${
              invoiceData.countryInfo.destination
            }</span>
          </div>
        </div>

        <div class="optional-info">
          <div>
            <strong>EORI No.:</strong> 
            <span id="eori-number" contenteditable="true">${
              invoiceData.optionalInfo.eoriNumber
            }</span>
          </div>
          <div>
            <strong>Shipper VAT:</strong> 
            <span id="shipper-vat" contenteditable="true">${
              invoiceData.optionalInfo.shipperVAT
            }</span>
          </div>
          <div>
            <strong>INCOTERM:</strong> 
            <span id="incoterm" contenteditable="true">${
              invoiceData.optionalInfo.incoterm
            }</span>
          </div>
        </div>

        <div class="optional-info">
          <div>
            <strong>Identification Number:</strong> 
            <span id="identification-number" contenteditable="true">${
              invoiceData.optionalInfo.identificationNumber
            }</span>
          </div>
          <div>
            <strong>Final Use:</strong> 
            <span id="final-use" contenteditable="true">${
              invoiceData.optionalInfo.finalUse
            }</span>
          </div>
          <div>
            <strong>Sample:</strong> 
            <span id="sample" contenteditable="true">${
              invoiceData.optionalInfo.sample
            }</span>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Description of Goods</th>
              <th>Customs Tarif Code</th>
              <th>Quantity</th>
              <th>Unit of Measure</th>
              <th>Weight (kg)</th>
              <th>Packages</th>
              <th>Unit Value (EUR)</th>
              <th>Total Value (EUR)</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="items-container">
            ${invoiceData.items
              .map(
                (item, index) => `
              <tr data-index="${index}">
                <td><span contenteditable="true" data-field="description">${item.description}</span></td>
                <td><span contenteditable="true" data-field="customsTarifCode">${item.customsTarifCode}</span></td>
                <td><span contenteditable="true" data-field="quantity">${item.quantity}</span></td>
                <td><span contenteditable="true" data-field="unitOfMeasure">${item.unitOfMeasure}</span></td>
                <td><span contenteditable="true" data-field="weight">${item.weight}</span></td>
                <td><span contenteditable="true" data-field="packages">${item.packages}</span></td>
                <td><span contenteditable="true" data-field="unitValue">${item.unitValue}</span></td>
                <td><span data-field="totalValue">${item.totalValue}</span></td>
                <td><span contenteditable="true" data-field="origin">${item.origin}</span></td>
                <td><button onclick="deleteItem(${index})" class="delete-item-btn">Delete</button></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <button onclick="addItem()" class="add-item-btn">+ Add Item</button>

        <div class="declaration">
          <p>These commodities are licensed for the ultimate destination shown. The exporter of the products covered by this document declares that, except otherwise clearly indicated, these products are of EEA preferential origin.</p>
        </div>

        <div class="signature-section">
          <div>
            <p>Signature of Shipper/Exporter: <span id="shipper-signature" contenteditable="true">Pooja Robin</span></p>
            <p>Date: <span id="invoice-date" contenteditable="true">02/12/2024</span></p>
          </div>
        </div>
      </div>

      <script>
        function sendUpdate(type, data) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: type,
            data: data
          }));
        }

        document.addEventListener('input', function(e) {
          const target = e.target;
          const parentRow = target.closest('tr');
          
          // Tracking Info
          const trackingFields = ['bill-of-lading', 'chronopost-ref'];
          if (trackingFields.includes(target.id)) {
            sendUpdate('UPDATE_TRACKING_INFO', {
              field: target.id.replace('-', '_'),
              value: target.innerText
            });
          }

          // Shipper/Consignee Info
          const shipperFields = ['shipper-name', 'shipper-address', 'shipper-phone', 'shipper-email'];
          const consigneeFields = ['consignee-name', 'consignee-address', 'consignee-phone', 'consignee-email'];
          if (shipperFields.includes(target.id)) {
            sendUpdate('UPDATE_SHIPPER_INFO', {
              field: target.id.replace('shipper-', ''),
              value: target.innerText
            });
          }
          if (consigneeFields.includes(target.id)) {
            sendUpdate('UPDATE_CONSIGNEE_INFO', {
              field: target.id.replace('consignee-', ''),
              value: target.innerText
            });
          }

          // Country Info
          const countryFields = ['export-country', 'destination-country'];
          if (countryFields.includes(target.id)) {
            sendUpdate('UPDATE_COUNTRY_INFO', {
              field: target.id.replace('-country', ''),
              value: target.innerText
            });
          }

          // Optional Info
          const optionalFields = ['eori-number', 'shipper-vat', 'incoterm', 'identification-number', 'final-use', 'sample'];
          if (optionalFields.includes(target.id)) {
            sendUpdate('UPDATE_OPTIONAL_INFO', {
              field: target.id.replace('-', '_'),
              value: target.innerText
            });
          }

          // Signature Section
          const signatureFields = ['shipper-signature', 'invoice-date'];
          if (signatureFields.includes(target.id)) {
            sendUpdate('UPDATE_SIGNATURE_INFO', {
              field: target.id.replace('-', '_'),
              value: target.innerText
            });
          }

          // Items Update
          if (parentRow && parentRow.dataset.index !== undefined) {
            const index = parseInt(parentRow.dataset.index);
            const field = target.dataset.field;
            
            sendUpdate('UPDATE_ITEM', {
              index: index,
              field: field,
              value: target.innerText
            });
          }
        });

        function addItem() {
          sendUpdate('ADD_ITEM', {});
        }

        function deleteItem(index) {
          sendUpdate('DELETE_ITEM', { index: index });
        }

        function setupContentEditableHandling() {
          const editableElements = document.querySelectorAll('[contenteditable="true"]');
          
          editableElements.forEach(el => {
            el.addEventListener('keydown', function(e) {
              // Prevent default behavior that might close keyboard
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            });

            el.addEventListener('input', function(e) {
              // Ensure message is sent on input
              sendUpdate(/* your existing logic */);
            });
          });
        }

        // Wait this after page load
        window.onload = function() {
          // Enhanced Input Handling
          document.addEventListener('DOMContentLoaded', setupContentEditableHandling);
          // Managing input focus
          document.addEventListener('focus', function(e) {
            if (e.target.contentEditable === 'true') {
              e.target.style.backgroundColor = '#f0f0f0';
            }
          }, true);

          document.addEventListener('blur', function(e) {
            if (e.target.contentEditable === 'true') {
              e.target.style.backgroundColor = 'transparent';
            }
          }, true);
        }
      </script>
    </body>
    </html>
  `;

  const handleDataChange = (data: DocumentField[]) => {
    setInvoiceData(data);
    console.log("Updated Document Data:", data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <KeyboardAvoidingView>
          <DynamicDocumentInput
            fields={InvoiceDataJsonTransformed}
            onDataUpdate={handleDataChange}
          />
          <View style={styles.container}>
            <Link
              asChild
              href={{
                pathname: "/(tabs)/(InvoiceGeneratorScreens)/invoice-editor",
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Generate Invoice</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.48,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
