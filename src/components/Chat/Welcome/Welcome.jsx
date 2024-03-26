import { Logo } from "../../../svg";

export default function WhatsappHome() {
  return (
    <div className="h-full w-full dark:bg-dark_bg_6 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-blue-400">
      {/*Container*/}
      <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        <span className="justify-center-center">
          <Logo />
        </span>
        {/*Infos*/}
      
      </div>
    </div>
  );
}
