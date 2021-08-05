import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  Create,
  required,
  Edit,
  PasswordInput,
} from "react-admin";

export const AdminList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="username" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

export const AdminCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <PasswordInput source="password" validate={required()} />
      <TextInput source="email" validate={required()} />
    </SimpleForm>
  </Create>
);

export const AdminEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <PasswordInput source="password" />
      <TextInput source="email" validate={required()} />
    </SimpleForm>
  </Edit>
);
