import { APIENDPOINT } from "../../Constants/constants";
const getFeedFetchQuery = (feedType, page) => {
  return `query { storiesFeed(type: ${feedType},page: ${page})
  { 
    _id
    title
    dateAdded
    brief
    coverImage
    slug
    cuid
    author {   
        photo
        name,
    }
  }
  }`;
};

export const pageSize = 10;
export const removeDuplicateAndMerge = (prevData, newData, blogId) => {
  let blogIdRef = blogId.current;
  let arr = [];
  if (blogIdRef.size === 0) {
    newData.forEach((item) => {
      blogIdRef.add(item._id);
    });
    return newData;
  } else {
    newData.forEach((item) => {
      const newId = !blogIdRef.has(item._id);
      if (newId) {
        arr.push(item);
        blogIdRef.add(item._id);
      }
    });
  }
  const mergedData = [...prevData, ...arr];
  return mergedData;
};

export const fetchBlogs = async (selectedApiType, pageNo) => {
  let data = [],
    errorMessage = "";
  try {
    let res = await fetch(APIENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getFeedFetchQuery(selectedApiType, pageNo),
      }),
    });
    res = await res.json();
    data = res?.data?.storiesFeed;

    // don't know the nested error msg
  } catch (err) {
    errorMessage = err;
  }
  return { data, errorMessage };
};

// Prev approach to store end points of paginated blocks and remove the repeated values
// First we thought the repeated values will be in linear fashion, but it's not true always and this method had some
// shortcomings, then went with the current set method

// The set method is more fast, because prev we had to reiterate and get end points of paginated blocks everytime
// though it could be optimized later and moved to ref array and would have update when needed
// but in the end we need to check whether the any of new data already exist
// set.has is much faster then finding index

// Also this solutions assumes the repeated data will be in linear way, that's why it had some shortcomings and in some certain case
// it would just break

// let elementsToslice = 0;
// if (prevData.length > 0) {
//   let arrayBlockValues = [];
//   const prevDataLength = prevData.length;
//   let blockRemainingToVisit = prevDataLength;
//   arrayBlockValues[0] = prevData[0]._id;
//   for (let i = 1; blockRemainingToVisit > 0; i++) {
//     arrayBlockValues[i] = prevData[i * pageSize - 1]._id;
//     blockRemainingToVisit = blockRemainingToVisit - pageSize;
//     if (blockRemainingToVisit < pageSize && blockRemainingToVisit !== 0) {
//       arrayBlockValues[i + 1] = prevData[prevData.length - 1]._id;
//       blockRemainingToVisit = -1;
//     }
//   }

//   for (let i in newData) {
//     let pos = arrayBlockValues.indexOf(newData[i]._id);
//     if (pos >= 0) {
//       //   console.log(pos, newData[i]._id, prevData[pos]._id);
//       elementsToslice = pos > pageSize - 1 ? pageSize : i + 1;
//       break;
//     }
//   }
// }
// let filteredData = newData.slice(elementsToslice);
// const mergedData = [...prevData, ...filteredData];
