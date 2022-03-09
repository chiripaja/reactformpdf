
import React,{useState,useEffect} from 'react'
import { useFormik } from 'formik';
import Alerterror from './components/Alerterror';
import Escritura from './components/Escritura';
import { jsPDF } from "jspdf";
function App() {

  const [datos, setdatos] = useState([]);


  const validate = values => {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = 'Campo Requerido';
    } else if (values.nombre.length < 3) {
      errors.nombre = 'Debe ser mayor a 3 caracteres';
    }
  
    if (!values.apellido) {
      errors.apellido = 'Campo Requerido';
    } else if (values.apellido.length < 3) {
      errors.apellido = 'Debe ser mayor a 3 caracteres';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
    },
    validate,
    onSubmit: values => {
      var doc = new jsPDF();

doc.setFontSize(40);
doc.text(values.nombre+', '+values.apellido, 35, 25);
doc.addImage("https://raw.githubusercontent.com/parallax/jsPDF/master/examples/images/Octocat.jpg", "JPEG", 15, 40, 180, 180);
doc.save("pdf.pdf");
    },
  });
 
  return (
    <div>

<form onSubmit={formik.handleSubmit}>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="flex-none bg-white max-w-md w-full space-y-8 p-4 shadow-2xl shadow-slate-700 ">
          <div>
            <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Formulario a PDF</h2>
           
          </div>
          {(formik.values.nombre.length || formik.values.apellido.length) ?
            <Escritura nombre={formik.values.nombre} apellido={formik.values.apellido}/>:null
          }
         
          <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-3 mt-2"
                  placeholder="Nombres"
                />
                {formik.touched.nombre && formik.errors.nombre ? <div> <Alerterror errortxt={formik.errors.nombre}/></div> : null}
              </div>
              <div>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.apellido}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-3"
                  placeholder="Apellidos"
                  autoComplete="off"
                />
              </div>
              {formik.touched.apellido && formik.errors.apellido ? <div>  <Alerterror errortxt={formik.errors.apellido}/></div> : null}
            </div>
        

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  
                </span>
               Convertir a PDF
              </button>
            </div>
           
        </div>
      </div>
</form>

</div>
  );
}

export default App;
