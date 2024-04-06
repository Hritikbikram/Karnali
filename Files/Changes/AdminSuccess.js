import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import Header from "./AdComponents/Header";
import {
  useCreateSuccessMutation,
  useGetSuccessQuery,
} from "./AdminApi/CourseNameApi";
import { useFormik } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";

const AdminSuccess = () => {
  const { data } = useGetSuccessQuery();
  console.log(data);

  const [createSuccessStories] = useCreateSuccessMutation();

  const successSchema = Yup.object().shape({
    storyperson: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets only"),
    storyjob: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets only"),
    storyplace: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(/^[ A-Za-z_ ]*$/, "Name should contain alphabets only"),

    storydate: Yup.string().required("Required"),

    storyimage: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      storyperson: "",
      storyjob: "",
      storyplace: "",
      storydate: "",
      storyimage: "",
    },
    validationSchema: successSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("storyperson", values?.storyperson);
        formData.append("storyjob", values.storyjob);
        formData.append("storyplace", values.storyplace);
        formData.append("storydate", values.storydate);
        formData.append("storyimage", values.storyimage);
        console.log(values);

        const result = await createSuccessStories(formData).unwrap();
        if (result) {
          toast.success("Added Successfully");

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
        <h1 className="text-4xl font-bold pb-5">Success Stories</h1>
        {/* Add Blogs */}

        <div>
          <form
            className="mt-8 mb-2  max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex gap-6">
              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Name</h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="storyperson"
                  onChange={formik.handleChange}
                  value={formik.values.storyperson}
                />
                {formik.errors.storyperson && formik.touched.storyperson && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.storyperson}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Job Role</h1>

                <Input
                  type="text"
                  size="lg"
                  label="Job"
                  name="storyjob"
                  onChange={formik.handleChange}
                  value={formik.values.storyjob}
                />
                {formik.errors.storyjob && formik.touched.storyjob && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.storyjob}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Work Place</h1>

                <Input
                  type="text"
                  size="lg"
                  label="Place"
                  name="storyplace"
                  onChange={formik.handleChange}
                  value={formik.values.storyplace}
                />
                {formik.errors.storyplace && formik.touched.storyplace && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.storyplace}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Date</h1>

                <Input
                  type="date"
                  size="lg"
                  name="storydate"
                  onChange={formik.handleChange}
                  value={formik.values.storydate}
                />
                {formik.errors.storydate && formik.touched.storydate && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.storydate}
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
                  name="storyimage"
                  onChange={formik.handleChange}
                  value={formik.values.storyimage}
                />
                {formik.errors.storyimage && formik.touched.storyimage && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.storyimage}
                  </h2>
                )}
              </div>
            </div>

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </div>
        {/* Add Blogs End */}
        {/* Destionation Table */}
        <h1 className="text-4xl font-bold py-5">Success Stories List</h1>
        <div className="pt-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-xl">S.No</th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Job Role</th>
                <th className="text-xl">WorkPlace</th>
                <th className="text-xl">Date</th>
                <th className="text-xl">Image</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.SuccessStory.map((Successdet) => {
                  return (
                    <tr className="text-center" key={Successdet?._id}>
                      <td className="text-lg p-2">Place 1</td>
                      <td className="text-lg p-2">{Successdet?.SuccessName}</td>
                      <td className="text-lg p-2">{Successdet?.SuccessJob}</td>
                      <td className="text-lg p-2">
                        {Successdet?.SuccessPlace}
                      </td>
                      <td className="text-lg p-2">{Successdet?.SuccessDate}</td>
                      <td className="text-lg p-2">
                        {Successdet?.SuccessImage}
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
        {/* Blogs Table End */}
      </div>
    </div>
  );
};

export default AdminSuccess;
