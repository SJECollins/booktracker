export const convertRatingToStars = (rating) => {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += "⭐";
  }
  return stars;
};
