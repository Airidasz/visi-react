import React, { forwardRef } from 'react';

const Form = forwardRef(
  (
    { children, onSubmit = () => {}, autoComplete = 'off', className = '' },
    ref
  ) => {
    const onSubmitInternal = (e) => {
      e.preventDefault();
      onSubmit(e);
      return false;
    };

    return (
      <form
        ref={ref}
        onSubmit={onSubmitInternal}
        className={className}
        autoComplete={autoComplete}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';
export default Form;
