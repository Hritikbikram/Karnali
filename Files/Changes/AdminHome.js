import React from "react";
import Header from "./AdComponents/Header";
import { Button, Input } from "@material-tailwind/react";

import * as Yup from "yup";
import {
  useCreateCourseMutation,
  useGetCourseByNameQuery,
} from "./AdminApi/CourseNameApi";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
const AdminHome = () => {
  const { data, error, isLoading } = useGetCourseByNameQuery();
  console.log(data);

  const [createCourses, { isLoading: isLoad }] = useCreateCourseMutation();

  const courseSchema = Yup.object().shape({
    coruseName: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(
        /^[ A-Za-z_@./#&+-]*$/,
        "Name should contain alphabets and only @./#&+ character allowed !!!"
      ),
    studentTotal: Yup.string()
      .matches(/^[0-9]/, "Number only allowed !!")
      .required("Required")
      .min(1, "Too Short !!!")
      .max(8, "Too long !!!"),
  });

  const formik = useFormik({
    initialValues: {
      coruseName: "",

      studentTotal: "",
    },
    validationSchema: courseSchema,

    onSubmit: async (values) => {
      try {
        console.log(values);
        const result = await createCourses(values).unwrap();
        if (result.status === "success") {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        console.log(e);
        // toast.error(`${e}`);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="h-[300px] mt-14">
        <lottie-player
          src="https://lottie.host/01986b4b-7629-473a-8223-f06d23ec4120/LelU3WnIJp.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 bg-teal-50">
      <div className="bg-red-200 h-full rounded-tr-xl px-[10%] py-4 pb-[50%]">
        <Header />
      </div>

      <div className="bg-teal-50 col-span-5 p-[2%]">
        <h1 className="text-4xl font-bold pb-5">Dashboard</h1>

        {/* Course State */}
        <div>
          <form
            className="mt-8 mb-2  max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex gap-6">
              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Course Name{" "}
                </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Course"
                  name="coruseName"
                  onChange={formik.handleChange}
                  value={formik.values.coruseName}
                />
                {formik.errors.coruseName && formik.touched.coruseName && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.coruseName}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Total Students{" "}
                </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Students"
                  name="studentTotal"
                  onChange={formik.handleChange}
                  value={formik.values.studentTotal}
                />
                {formik.errors.studentTotal && formik.touched.studentTotal && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.studentTotal}
                  </h2>
                )}
              </div>
            </div>

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </div>
        {/* Course State End     */}
        {/* Course State Table */}
        <h1 className="text-4xl font-bold py-5">Course Status </h1>
        <div className="pt-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-xl">S.No</th>
                <th className="text-xl">Course Name</th>
                <th className="text-xl">Total Students</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.course.map((coursesnam) => {
                  return (
                    <tr className="text-center" key={coursesnam?._id}>
                      <td className="text-lg p-2"> 1</td>
                      <td className="text-lg p-2">{coursesnam?.title}</td>
                      <td className="text-lg p-2">{coursesnam?.body}</td>
                      <td className="text-lg p-2">
                        <a href="/">
                          <i className="fa-solid fa-pen-to-square p-4 text-blue-500 text-2xl hover:text-blue-800"></i>
                        </a>

                        <a href="/">
                          <i className="fa-solid fa-trash p-4 text-red-500 text-2xl hover:text-red-800"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* Course State Table end */}
      </div>
    </div>
  );
};

export default AdminHome;
