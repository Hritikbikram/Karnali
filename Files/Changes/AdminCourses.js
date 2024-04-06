import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React from "react";
import Header from "./AdComponents/Header";
import { useFormik } from "formik";
import {
  useCreateCourseDetailsMutation,
  useGetCourseDetailQuery,
} from "./AdminApi/CourseNameApi";
import * as Yup from "yup";
import { toast } from "react-toastify";
const AdminCourses = () => {
  const { data } = useGetCourseDetailQuery();
  console.log(data);

  const [CreateCorsDet] = useCreateCourseDetailsMutation();

  const coursesSchema = Yup.object().shape({
    corsname: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(
        /^[ A-Za-z_@./#&+-]*$/,
        "Name should contain alphabets and only @./#&+ character allowed !!!"
      ),
    corsfullnam: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets"),
    corsdura: Yup.string()
      .required("Required")
      .min(1, "Too Short !!!")
      .max(8, "Too long !!!")
      .matches(/^[0-9]*$/, "Number only allowed"),
    corstate: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets"),
    corspath: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets"),
    corsdesp: Yup.string()
      .required("Required")
      .min(1, "Too Short !!!")
      .max(500, "Too long !!!"),
    corsben: Yup.string()
      .required("Required")
      .min(1, "Too Short !!!")
      .max(500, "Too long !!!"),
    corscont: Yup.string()
      .required("Required")
      .min(1, "Too Short !!!")
      .max(500, "Too long !!!"),
  });

  const formik = useFormik({
    initialValues: {
      corsname: "",
      corsfullnam: "",
      corsdura: "",
      corstate: "",
      corspath: "",
      corsdesp: "",
      corsben: "",
      corscont: "",
    },
    validationSchema: coursesSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("corsname", values?.corsname);
        formData.append("corsfullnam", values.corsfullnam);

        formData.append("corsdura", values.corsdura);
        formData.append("corstate", values.corstate);
        formData.append("corspath", values.corspath);

        formData.append("corsdesp", values.corsdesp);
        formData.append("corsben", values.corsben);
        formData.append("corscont", values.corscont);

        console.log(values);

        const result = await CreateCorsDet(formData).unwrap();

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
        <h1 className="text-4xl font-bold pb-5">Course Details Page</h1>

        {/* Add Package */}
        <div>
          <form
            className="mt-8 mb-2  max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex gap-6">
              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Course Name</h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="corsname"
                  onChange={formik.handleChange}
                  value={formik.values.corsname}
                />
                {formik.errors.corsname && formik.touched.corsname && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.corsname}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Course Full Name
                </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="corsfullnam"
                  onChange={formik.handleChange}
                  value={formik.values.corsfullnam}
                />
                {formik.errors.corsfullnam && formik.touched.corsfullnam && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.corsfullnam}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Course Duration
                </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="corsdura"
                  onChange={formik.handleChange}
                  value={formik.values.corsdura}
                />
                {formik.errors.corsdura && formik.touched.corsdura && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.corsdura}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Course State
                </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="corstate"
                  onChange={formik.handleChange}
                  value={formik.values.corstate}
                />
                {formik.errors.corstate && formik.touched.corstate && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.corstate}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Future Career
                </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="corspath"
                  onChange={formik.handleChange}
                  value={formik.values.corspath}
                />
                {formik.errors.corspath && formik.touched.corspath && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.corspath}
                  </h2>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold pb-5 ">Course Description</h1>

              <Textarea
                label="Description"
                className="w-full  bg-white"
                name="corsdesp"
                onChange={formik.handleChange}
                value={formik.values.corsdesp}
              ></Textarea>
              {formik.errors.corsdesp && formik.touched.corsdesp && (
                <h2 className="pt-2 text-red-500">{formik.errors.corsdesp}</h2>
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold pb-5 ">Course Benifits</h1>

              <Textarea
                label="Course Benefits"
                className="w-full  bg-white"
                name="corsben"
                onChange={formik.handleChange}
                value={formik.values.corsben}
              ></Textarea>
              {formik.errors.corsben && formik.touched.corsben && (
                <h2 className="pt-2 text-red-500">{formik.errors.corsben}</h2>
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold pb-5 ">Course Contents</h1>

              <Textarea
                label="Course Content"
                className="w-full  bg-white"
                name="corscont"
                onChange={formik.handleChange}
                value={formik.values.corscont}
              ></Textarea>
              {formik.errors.corscont && formik.touched.corscont && (
                <h2 className="pt-2 text-red-500">{formik.errors.corscont}</h2>
              )}
            </div>

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </div>
        {/* Add Package End */}
        {/* Destionation Table */}
        <h1 className="text-4xl font-bold py-5">Course Details </h1>
        <div className="pt-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-xl">S.No</th>
                <th className="text-xl">Course Name</th>
                <th className="text-xl">Course Exact Name</th>
                <th className="text-xl">Course Duration</th>
                <th className="text-xl">Course State</th>
                <th className="text-xl">Future Career</th>
                <th className="text-xl">Course Description</th>
                <th className="text-xl">Course Benefits</th>
                <th className="text-xl">Course Contents</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.CourseInfo.map((coursedet) => {
                  return (
                    <tr className="text-center" key={coursedet?._id}>
                      <td className="text-lg p-2">Place 1</td>
                      <td className="text-lg p-2"> {coursedet?.CourseName}</td>
                      <td className="text-lg p-2">{coursedet?.CourseSkName}</td>
                      <td className="text-lg p-2">
                        {coursedet?.CourseDuration}
                      </td>
                      <td className="text-lg p-2">{coursedet?.ClassState}</td>
                      <td className="text-lg p-2">{coursedet?.CareerAfter}</td>
                      <td className="text-lg p-2">
                        {coursedet?.CourseDetails}
                      </td>
                      <td className="text-lg p-2">
                        {coursedet?.CourseBenefits}
                      </td>
                      <td className="text-lg p-2">
                        {coursedet?.CourseContents}
                      </td>
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
        {/* Package Table End */}
      </div>
    </div>
  );
};

export default AdminCourses;
