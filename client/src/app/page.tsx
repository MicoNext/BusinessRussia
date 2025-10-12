import Header from "@/components/header/Header"
import Footer from "@/components/Footer/Footer"
import type { ISliderMain } from "../../../package/types/models/sliderMain"

interface IProps {
  sliderMain: ISliderMain[]
}

const props: IProps = {
  sliderMain: [
    {
      _id: "213",
      createdAt: new Date(),
      tags: [],
      title: "dfasd",
      type: "img",
      url: "sd",
      sourse: {
        buttonName: "dsad",
        url: "sadasd"
      }
    }
  ]
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      <h1>hello is HomePage</h1>
      <h2>{props.sliderMain[0]._id}</h2>
    </div>
  )
}