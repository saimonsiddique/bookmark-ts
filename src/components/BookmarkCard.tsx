import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Bookmark {
  id?: number;
  title: string;
  url: string;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${bookmark.id}`);
  };

  return (
    <>
      <div className="bg-base-100 shadow-md rounded-md">
        <div className="p-2">
          <div className="flex justify-between items-center">
            <Link
              to={bookmark.url ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold"
            >
              {bookmark.title}
            </Link>
            <button
              type="button"
              className="btn rounded-xl bg-rose-500 text-white hover:bg-rose-600"
              onClick={handleNavigate}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookmarkCard;
