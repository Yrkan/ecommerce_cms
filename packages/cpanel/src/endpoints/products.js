import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  Create,
  SimpleForm,
  TextInput,
  required,
  Edit,
  SelectInput,
  ReferenceInput,
  NumberInput,
  BooleanInput,
} from "react-admin";

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput
        label="category"
        source="category"
        reference="categories"
        validate={[required()]}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="price" validate={[required()]} />
      <BooleanInput
        label="en stock"
        source="in_stock"
        defaultValue={true}
        validate={[required()]}
      />
      <TextInput source="description" multiline validate={[required()]} />
      <TextInput label="Image URL" source="img_url" />
    </SimpleForm>
  </Create>
);

export const ProductList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <BooleanField source="in_stock" />
      <NumberField source="price" />
      <TextField source="category.name" label="Category" />
      <TextField source="description" />
    </Datagrid>
  </List>
);

export const ProductEdit = (props) => {
  const transform = (payload) => {
    console.log(payload);
    return {
      ...payload,
      category: payload.categories.id,
    };
  };
  return (
    <Edit {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="name" />
        <NumberInput source="price" validate={[required()]} />
        <ReferenceInput
          label="category"
          source="categories.id"
          reference="categories"
          validate={[required()]}
        >
          <SelectInput optionText="name" value="id" source="category" />
        </ReferenceInput>
        <BooleanInput
          label="en stock"
          source="in_stock"
          defaultValue={true}
          validate={[required()]}
        />
        <TextInput source="description" multiline validate={[required()]} />
        <TextInput label="Image URL" source="img_url" />
      </SimpleForm>
    </Edit>
  );
};
