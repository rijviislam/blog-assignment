import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Modal from "./Modal";

export default function Landing() {
  return (
    <>
      <div className="flex items-end justify-end mx-38 my-10">
        <Modal />
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 place-content-center place-items-center items-center justify-center max-w-300 w-full">
          <Link href={`/blog/1`} className="w-full  max-w-sm cursor-pointer">
            <Card className="min-h-100">
              <CardHeader>
                <CardTitle className="text-xl">Login to your account</CardTitle>
                <CardDescription className="text-base">
                  Enter your email below to login to your account Lorem ipsum
                  dolor sit, amet consectetur adipisicing elit. Non, similique
                  animi? Ipsa id, quaerat laborum quidem quia deserunt odit?
                  Nobis et, tenetur eius commodi esse explicabo vel nisi
                  adipisci possimus veniam magni voluptatum dolores molestias
                  provident hic accusamus corrupti, deleniti quis fuga odit
                  repellat in neque dolorem repellendus? Error, atque est animi
                  illo quia totam, consectetur laborum commodi quis soluta iste
                  corrupti eaque voluptate corporis perspiciatis? Similique,
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href={`/blog/2`} className="w-full  max-w-sm cursor-pointer">
            <Card className="min-h-100">
              <CardHeader>
                <CardTitle className="text-xl">Login to your account</CardTitle>
                <CardDescription className="text-base">
                  Enter your email below to login to your account Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Fugit aut atque
                  earum saepe. Quisquam, neque molestias laborum perferendis
                  corporis culpa ipsa fuga debitis doloribus quae vitae
                  reiciendis. Reprehenderit enim quisquam obcaecati optio
                  doloremque voluptatum eius non voluptate delectus dignissimos,
                  officia est minima neque quis at iure dolorum. Culpa at quam
                  alias beatae quisquam placeat tempora nobis nam, quis, ducimus
                  dicta! Temporibus nostrum incidunt,
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href={`/blog/3`} className="w-full  max-w-sm cursor-pointer">
            <Card className="min-h-100">
              <CardHeader>
                <CardTitle className="text-xl">Login to your account</CardTitle>
                <CardDescription className="text-base">
                  Enter your email below to login to your account Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit. Voluptates
                  recusandae ut natus itaque nihil hic aliquam quasi corrupti
                  nesciunt ad. Magni quia corrupti a aperiam dolore illo natus
                  cum ab possimus soluta, provident nemo consequatur, suscipit
                  corporis inventore! Illum error nisi nemo dolore labore,
                  voluptate nulla est doloribus ullam eos.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
