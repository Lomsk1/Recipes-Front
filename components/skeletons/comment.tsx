import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function CommentSkeletonLoading() {
  return (
    <SkeletonTheme baseColor="#c0c0c0" highlightColor="#f5f5f5">
      <Skeleton
        count={1}
        height={40}
        width={40}
        duration={1.5}
        circle={true}
        className="skeletonClass"
        inline
      />
      <Skeleton
        count={1}
        height={40}
        duration={1.5}
        className="skeletonClass"
        style={{ width: "140px", marginLeft: "20px" }}
      />
      <Skeleton
        count={1}
        height={20}
        duration={1.5}
        className="skeletonClass"
        style={{ width: "100px", marginTop: "10px" }}
      />
      <Skeleton
        count={1}
        height={20}
        duration={1.5}
        className="skeletonClass"
        style={{ width: "200px", marginTop: "10px" }}
      />
      <Skeleton
        count={1}
        height={20}
        duration={1.5}
        className="skeletonClass"
        style={{ width: "100px", marginTop: "10px" }}
      />
    </SkeletonTheme>
  );
}

export default CommentSkeletonLoading;
