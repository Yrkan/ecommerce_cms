import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  Create,
  ArrayInput,
  SimpleFormIterator,
  required,
  Edit,
  ArrayField,
  SingleFieldList,
} from "react-admin";
import SimpleChipField from "../components/SimpleChipField";

export const CategoryList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <ArrayField source="sub_category">
        <SingleFieldList>
          <SimpleChipField />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

export const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <ArrayInput source="drinks" validate={required()}>
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export const CategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <ArrayInput source="drinks" validate={required()}>
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
