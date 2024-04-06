import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import Header from "./AdComponents/Header";
import {
  useCreateTestimonialMutation,
  useGetTestimonialQuery,
} from "./AdminApi/CourseNameApi";
import { useFormik } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";

const AdminTestimonials = () => {
  const { data } = useGetTestimonialQuery();
  console.log(data);

  const [createTestimonialsDat] = useCreateTestimonialMutation();

  const testimonialSchema = Yup.object().shape({
    testimonialperson: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets only"),
    testimonialcourse: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets only"),

    testimonialdate: Yup.string().required("Required"),

    testimonialimage: Yup.string().required("Required"),
    testimonialmessage: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(500, "Too long !!!"),
  });

  const formik = useFormik({
    initialValues: {
      testimonialperson: "",
      testimonialcourse: "",
      testimonialdate: "",
      testimonialmessage: "",
      testimonialimage: "",
    },
    validationSchema: testimonialSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("testimonialperson", values?.testimonialperson);
        formData.append("testimonialcourse", values.testimonialcourse);
        formData.append("testimonialdate", values.testimonialdate);
        formData.append("testimonialmessage", values.testimonialmessage);
        formData.append("testimonialimage", values.testimonialimage);
        console.log(values);

        const result = await createTestimonialsDat(formData).unwrap();
        if (result) {
          toast.success("Added Successfully");
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        // toast.error(`${e}`);
      }
    },
  });

  return (
    <div className="grid grid-cols-6 bg-teal-50">
      <div className="bg-red-200 h-full rounded-tr-xl px-[10%] py-4 pb-[50%]">
        <Header />
      </div>

      <div className="bg-teal-50 col-span-5 p-[2%]">
        <h1 className="text-4xl font-bold pb-5">Testimonials</h1>

        {/* Add Blogs */}

        <div>
          <form
            className="mt-8 mb-2  max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex gap-6">
              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Course</h1>

                <Input
                  type="text"
                  size="lg"
                  name="testimonialcourse"
                  label="Course"
                  onChange={formik.handleChange}
                  value={formik.values.testimonialcourse}
                />
                {formik.errors.testimonialcourse &&
                  formik.touched.testimonialcourse && (
                    <h2 className="pt-2 text-red-500">
                      {formik.errors.testimonialcourse}
                    </h2>
                  )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Person</h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="testimonialperson"
                  onChange={formik.handleChange}
                  value={formik.values.testimonialperson}
                />
                {formik.errors.testimonialperson &&
                  formik.touched.testimonialperson && (
                    <h2 className="pt-2 text-red-500">
                      {formik.errors.testimonialperson}
                    </h2>
                  )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Date</h1>

                <Input
                  type="date"
                  size="lg"
                  name="testimonialdate"
                  onChange={formik.handleChange}
                  value={formik.values.testimonialdate}
                />
                {formik.errors.testimonialdate &&
                  formik.touched.testimonialdate && (
                    <h2 className="pt-2 text-red-500">
                      {formik.errors.testimonialdate}
                    </h2>
                  )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Select Image
                </h1>

                <Input
                  type="file"
                  size="lg"
                  label="Image"
                  name="testimonialimage"
                  onChange={formik.handleChange}
                  value={formik.values.testimonialimage}
                />
                {formik.errors.testimonialimage &&
                  formik.touched.testimonialimage && (
                    <h2 className="pt-2 text-red-500">
                      {formik.errors.testimonialimage}
                    </h2>
                  )}
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold pb-5 ">
                Add Testimonial Description
              </h1>

              <Textarea
                label="Description"
                className="w-full  bg-white"
                name="testimonialmessage"
                onChange={formik.handleChange}
                value={formik.values.testimonialmessage}
              ></Textarea>
              {formik.errors.testimonialmessage &&
                formik.touched.testimonialmessage && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.testimonialmessage}
                  </h2>
                )}
            </div>

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </div>

        {/* Add Blogs End */}

        {/* Destionation Table */}

        <h1 className="text-4xl font-bold py-5">Testimonials List</h1>

        <div className="pt-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-xl">S.No</th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Course</th>
                <th className="text-xl">Date</th>
                <th className="text-xl">Testimonial</th>
                <th className="text-xl">Image</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.testimonial.map((testdet) => {
                  return (
                    <tr className="text-center" key={testdet?._id}>
                      <td className="text-lg p-2">Place 1</td>
                      <td className="text-lg p-2">{testdet?.TestiName}</td>
                      <td className="text-lg p-2">{testdet?.TestiCourse}</td>
                      <td className="text-lg p-2">{testdet?.TestiDate}</td>
                      <td className="text-lg p-2">{testdet?.TestiMsg}</td>
                      <td className="text-lg p-2">{testdet?.TestiImage}</td>
                      <td className="text-lg p-2">
                        <a href="/">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Blogs Table End */}
      </div>
    </div>
  );
};

export default AdminTestimonials;
