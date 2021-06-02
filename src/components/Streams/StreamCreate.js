import React from "react";
import { Field, getFormInitialValues, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ type, input, label, meta, value }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type={type} value={value} />

        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValues) {
    //submit form to server somewhere

    console.log(formValues.image);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          type="text"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter a Description"
          type="text"
        />
        <Field
          name="image"
          type="file"
          component={this.renderInput}
          label="Select an image"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);
