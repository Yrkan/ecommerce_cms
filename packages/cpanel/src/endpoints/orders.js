import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  Edit,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
  AutocompleteInput,
  Show,
  SimpleShowLayout,
  BooleanField,
} from "react-admin";
import SimpleChipField from "../components/SimpleChipField";

export const OrderList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <ArrayField source="products">
        <SingleFieldList linkType={false}>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="quantities">
        <SingleFieldList>
          <SimpleChipField />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="drinks">
        <SingleFieldList>
          <SimpleChipField />
        </SingleFieldList>
      </ArrayField>
      <TextField label="client" source="client_name" />
      <TextField label="phone" source="client_phone" />
      <TextField source="status" />
      <NumberField source="total" />
    </Datagrid>
  </List>
);

export const OrderEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <AutocompleteInput
          source="status"
          choices={[
            { id: "Pending", name: "Pending" },
            { id: "Preparing", name: "Preparing" },
            { id: "Shipped", name: "Shipped" },
            { id: "Completed", name: "Completed" },
            { id: "Canceled", name: "Canceled" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

export const OrderShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <div>
          <ArrayField source="products" style={{ display: "inline" }}>
            <Datagrid>
              <BooleanField source="in_stock" />
              <TextField source="name" />
              <TextField source="price" />
            </Datagrid>
          </ArrayField>
          <ArrayField
            label="quantity"
            source="quantities"
            style={{ display: "inline" }}
          >
            <Datagrid>
              <SimpleChipField label="Quantity" />
            </Datagrid>
          </ArrayField>
          <ArrayField source="drinks" style={{ display: "inline" }}>
            <Datagrid>
              <SimpleChipField label="Drink" />
            </Datagrid>
          </ArrayField>
        </div>
        <TextField label="client" source="client_name" />
        <TextField label="phone" source="client_phone" />
        <TextField label="address" source="client_location" />
        <TextField label="email" source="client_email" />
        <TextField source="status" />
        <NumberField source="total" />
      </SimpleShowLayout>
    </Show>
  );
};
