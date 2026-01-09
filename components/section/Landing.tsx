import BlogGrid from "./BlogGrid";
import Modal from "./Modal";

export default function Landing() {
  return (
    <>
      <div className="flex items-end justify-end mx-38 my-10">
        <Modal />
      </div>
      <BlogGrid />
    </>
  );
}
