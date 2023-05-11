import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonForIngredientChosen() {
  return (
    <SkeletonTheme baseColor="#c0c0c0" highlightColor="#f5f5f5">
      <Skeleton
        count={8}
        style={{
          width: "65px",
          height: "30px",
          marginLeft: "20px",
        }}
        duration={1.5}
        className="skeletonClass"
        inline={true}
      />
    </SkeletonTheme>
  );
}

export default SkeletonForIngredientChosen;
