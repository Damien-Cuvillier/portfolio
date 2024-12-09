import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-sm mx-auto">
        <h2 className='text-3xl font-bold text-gray-800 px-5 py-5'>Contactez moi !</h2>
        <p className='font-bold text-gray-800 pb-5 '>Des questions ou des projets en vue ? Envoyez moi simplement un message ! </p>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2 text-left">Prénom et Nom</label>
            <Field type="text" name="name" className="shadow appearance-none border rounded-xl border-transparent bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-left">Email</label>
            <Field type="email" name="email" className="shadow appearance-none border rounded-xl border-transparent bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-bold mb-2 text-left">Message</label>
            <Field as="textarea" name="message" className="shadow appearance-none border rounded-xl border-transparent bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-2" />
          </div>

          <button type="submit" disabled={isSubmitting} className="px-40 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
            Valider
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;