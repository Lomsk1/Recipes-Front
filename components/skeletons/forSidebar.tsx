import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonForSidebar() {
  return (
    <SkeletonTheme baseColor="#c0c0c0" highlightColor="#f5f5f5">
      <Skeleton
        count={1}
        height={70}
        duration={1.5}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={150}
        duration={1.5}
        style={{ transform: "translateY(-5px)" }}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={50}
        duration={1.5}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={150}
        duration={1.5}
        style={{ transform: "translateY(-5px)" }}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={50}
        duration={1.5}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={150}
        duration={1.5}
        style={{ transform: "translateY(-5px)" }}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={50}
        duration={1.5}
        className="skeletonClass"
      />
      <Skeleton
        count={1}
        height={150}
        duration={1.5}
        style={{ transform: "translateY(-5px)" }}
        className="skeletonClass"
      />
    </SkeletonTheme>
  );
}

export default SkeletonForSidebar;
