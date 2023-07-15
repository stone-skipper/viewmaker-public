import { motion } from "framer-motion";

export default function SvgAnim({ color = "white", fade = true }) {
  return (
    <div className="w-full h-[80vh] relative flex justify-center items-center">
      <motion.svg
        width="266"
        height="317"
        viewBox="0 0 266 317"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M41.9865 30.5487C38.9784 53.926 28.6525 76.454 30.153 100.306C31.4531 120.97 69.2671 99.2752 76.4017 95.0182C89.414 87.2542 99.3237 75.6175 110.507 65.599C116.448 60.2767 118.068 59.6464 119.052 68.5264C121.365 89.3949 116.502 111.414 112.003 131.656C109.32 143.731 102.363 160.07 104.373 172.837C105.758 181.627 123.38 165.626 124.977 164.067C143.493 145.991 158.603 124.294 175.269 104.556C181.324 97.3846 186.599 86.515 193.557 80.3675C195.021 79.0742 195.05 84.2284 194.611 86.1317C189.921 106.478 182.767 126.445 177.11 146.533C165.506 187.747 152.967 228.887 142.796 270.486C141.568 275.512 140.221 280.518 139.012 285.547C137.938 290.018 145.094 278.623 147.71 274.842C172.03 239.696 198.976 198.463 235.774 174.759"
          stroke={color}
          strokeWidth="60"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: fade === true ? 0 : 1 }}
          transition={{ duration: 1, opacity: { delay: 1 } }}
        />
      </motion.svg>
    </div>
  );
}
