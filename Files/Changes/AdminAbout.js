import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import Header from "./AdComponents/Header";
import { useFormik } from "formik";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "./AdminApi/CourseNameApi";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import DeletePopup from "./Forms/DeletePopup";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AdminAbout = () => {
  const nav = useNavigate();

  const { data } = useGetAboutQuery();

  const aboutSchema = Yup.object().shape({
    abouttitle: Yup.string()
      .required("Required")
      .min(3, "Too Short !!!")
      .max(50, "Too long !!!")
      .matches(
        /^[ A-Za-z_@./#&+-]*$/,
        "Name should contain alphabets and only @./#&+ character allowed !!!"
      ),
    aboutdescription: Yup.string()
      .required("Required")
      .min(1, "Too Short !!!")
      .max(500, "Too long !!!"),
  });

  const [createAbout, { isLoading: isLoad }] = useCreateAboutMutation();

  const formik = useFormik({
    initialValues: {
      abouttitle: "",
      aboutImage: "",
      aboutdescription: "",
    },
    validationSchema: aboutSchema,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("abouttitle", values?.abouttitle);
        formData.append("aboutImage", values.aboutImage);
        formData.append("aboutdescription", values.aboutdescription);

        const result = await createAbout(formData).unwrap();
        console.log(result);
        if (result) {
          toast.success("Added Successfully ");
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        toast.error(`${e}`);
      }
    },
  });

  const deleteAbout = (id) => {
    return <DeletePopup id={id} />;
  };

  return (
    <div className="grid grid-cols-6 bg-teal-50">
      <div className="bg-red-200 h-full rounded-tr-xl px-[10%] py-4 pb-[50%]">
        <Header />
      </div>

      <div className="bg-teal-50 col-span-5 p-[2%]">
        <h1 className="text-4xl font-bold pb-5">About Us</h1>
        {/* Add About */}
        <div>
          <form
            className="mt-8 mb-2  max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex gap-6">
              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">Name </h1>

                <Input
                  type="text"
                  size="lg"
                  label="Name"
                  name="abouttitle"
                  onChange={formik.handleChange}
                  value={formik.values.abouttitle}
                />
                {formik.errors.abouttitle && formik.touched.abouttitle && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.abouttitle}
                  </h2>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold pb-5 pt-[5%] ">
                  Select Image
                </h1>

                {/* <Input type='file' size="lg" label="Image" name="aboutimage" /> */}

                <div className="">
                  {formik.values.imagePreview && (
                    <img
                      className="w-[60%] h-[150px]  mb-6  object-cover"
                      src={`${formik.values.imagePreview}`}
                    />
                  )}
                  <Input
                    required
                    type="file"
                    label="About Image"
                    name="aboutImage"
                    accept="image/*"
                    onChange={(e) => {
                      const logo = e.target.files[0];
                      formik.setFieldValue("aboutImage", logo);
                      const res = [
                        "image/png",
                        "image/jpg",
                        "image/jpeg",
                      ].includes(logo.type);
                      if (res) {
                        const reader = new FileReader();
                        reader.readAsDataURL(logo);
                        reader.addEventListener("load", () => {
                          formik.setFieldValue("imagePreview", reader.result);
                        });
                      } else {
                        formik.setFieldValue("imagePreview", null);
                      }
                    }}
                  />{" "}
                  {formik.errors.aboutImage && formik.touched.aboutImage && (
                    <h2 className="pt-2">{formik.errors.aboutImage}</h2>
                  )}{" "}
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold pb-5 ">
                Add Company Description
              </h1>

              <Textarea
                label="Description"
                className="w-full  bg-white"
                name="aboutdescription"
                onChange={formik.handleChange}
                value={formik.values.aboutdescription}
              ></Textarea>
              {formik.errors.aboutdescription &&
                formik.touched.aboutdescription && (
                  <h2 className="pt-2 text-red-500">
                    {formik.errors.aboutdescription}
                  </h2>
                )}
            </div>

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </div>
        {/* Add About End */}
        {/* About Table */}
        <h1 className="text-4xl font-bold py-5">About Us </h1>
        <div className="pt-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-xl">S.No</th>
                <th className="text-xl">Title</th>
                <th className="text-xl">Description</th>
                <th className="text-xl">Image</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.about.map((aboutdet) => {
                  return (
                    <tr className="text-center" key={aboutdet?._id}>
                      <td className="text-lg p-2">Place 1</td>
                      <td className="text-lg p-2">{aboutdet?.abttitle}</td>
                      <td className="text-lg p-2">
                        {aboutdet?.abtdescription}
                      </td>
                      <td className="text-lg p-2">Description</td>
                      <td className="text-lg p-2 flex justify-around">
                        <div
                          onClick={() =>
                            nav(`/admin/about_update/${aboutdet._id}`)
                          }
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div onClick={() => deleteAbout(aboutdet._id)}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </div>
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

export default AdminAbout;
