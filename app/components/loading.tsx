// import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(17,17,17)] backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 rounded-xl">
        <Image src="/images/loading.webp" alt="Loading..." width={500} height={500} priority />
        <div className="-mt-[100px] flex flex-col items-center gap-2">
          <div className="h-1 w-28 overflow-hidden rounded-full bg-[rgb(90,90,90)]">
            <div className="h-full w-full animate-loading-bar bg-[rgb(17,17,17)]" />
          </div>
          <p className="text-sm text-zinc-500">正在加载字体...</p>
        </div>
      </div>
    </div>
  );
}
