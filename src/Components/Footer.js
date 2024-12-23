import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';

const EMAILJS_TOKEN = process.env.EMAILJS_TOKEN;
const SERVICEID= process.env.SERVICEID;
const TEMPLATEID= process.env.TEMPLATEID;

const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Required'),
  });

  const sendEmail = (values, resetForm, setSubmitting) => {
    const serviceID = SERVICEID;
    const templateID = TEMPLATEID;
    const userID = EMAILJS_TOKEN;

    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message envoyé avec succès !');
        resetForm();
        setSubmitting(false);
      }, (error) => {
        console.log('FAILED...', error);
        alert('Échec de l\'envoi du message, veuillez réessayer.');
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendEmail(values, resetForm, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <div className='pt-20 pb-12 bg-gray-200'>
          <Form className="w-full max-w-sm mx-auto">
            <h2 id='contacts' className='text-3xl font-bold text-gray-800 px-5 py-5'>Contactez moi !</h2>
            <p className='font-bold text-gray-800 pb-5'>Des questions ou des projets en vue ? Envoyez-moi simplement un message !</p>
            <div className="mb-4">
              <label htmlFor="name"></label>
              <Field type="text" placeholder="Nom" name="name" className="shadow appearance-none border rounded-xl border-transparent bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="email"></label>
              <Field type="email" placeholder="E-mail" name="email" className="shadow appearance-none border rounded-xl border-transparent bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2" />
            </div>

            <div className="mb-4">
              <label htmlFor="message"></label>
              <Field as="textarea" placeholder="Votre message" name="message" className="shadow appearance-none border rounded-xl border-transparent bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-2" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
              Valider
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ContactForm;
