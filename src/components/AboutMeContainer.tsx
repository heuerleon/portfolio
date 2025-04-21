import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AboutMeContainer(props: Props) {
  return (
    <section className="padding-section" id="about">
      <div className="container">
        <div className="row row-reversed padding-row y-axis-centered nowrap">
          <div className="column-min col-margin">
            <Image
              src="/leon-heuer-2-min.jpg"
              id="about-me-img"
              alt="Leon Heuer"
              width={500}
              height={500}
            ></Image>
          </div>
          <div className="column-min col-margin">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  )
}