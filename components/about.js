import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";

export default function About({ toggle = true, zIndex = null }) {
  const [email, setEmail] = useState("");

  const url =
    "https://gmail.us21.list-manage.com/subscribe/post?u=5c89fcaa308f1dd540d2999af&amp;id=7e99c776fb";

  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(url);
  const { fields, handleFieldChange } = useFormFields({
    EMAIL: "",
    PROJECT: "Viewmaker",
  });
  const variants = {
    before: { y: 15, opacity: 0, boxShadow: "0px 0px 0px 200px rgba(0,0,0,0)" },
    after: { y: 0, opacity: 1, boxShadow: "0px 0px 0px 200px rgba(0,0,0,0.8)" },
  };

  const transition = {
    type: "spring",
    damping: 20,
    stiffness: 600,
  };

  let variant = "default";
  if (email) {
    if (email) variant = "valid";
    else variant = "invalid";
  }

  return (
    <div className="h-full w-full absolute flex justify-center items-center">
      <motion.div
        className="h-fit w-[92%] bg-[white] p-6 rounded-lg"
        style={{
          boxShadow: "0px 0px 0px 200px rgba(0,0,0,0.8)",
          zIndex: zIndex,
        }}
        variants={variants}
        initial={"before"}
        animate={toggle === true ? "after" : "before"}
        transition={transition}
      >
        <div className="text-[#00885F] h-fit uppercase text-center">
          <h3 className="text-3xl w-full ">Join waitlist</h3>
          <br />
          This is a beta version of Viewmaker. <br />
          Get notified when the official version is ready, with a special offer
          🎁
          <br /> <br />
          <div className="text-sm">
            <br />- personal account
            <br />- history of generated images
            <br />- improved image generating model
            <br />- better photo resolution
            <br />- ios/android app
          </div>
          <br /> <br />
          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(fields);
              }}
              className="flex justify-start items-center w-full rounded-lg flex-row gap-3"
            >
              <input
                id="EMAIL"
                autoFocus
                placeholder="email"
                type="email"
                className="py-3 rounded-md w-full"
                value={fields.EMAIL}
                onChange={handleFieldChange}
                style={{ background: "rgb(240,240,240)" }}
              />

              <button
                className="py-3 px-5 block text-center text-white rounded-md cursor-pointer w-fit"
                style={{ background: "#24B68A" }}
              >
                Subscribe
              </button>
            </form>
            <div className="text-xs pt-3 h-fit">
              {loading && "submitting"}
              <span className="text-[red]"> {error && message}</span>
              {success && message}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
