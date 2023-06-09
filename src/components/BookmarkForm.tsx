import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import axios from "axios";

interface Category {
  name: string;
}

interface Bookmark {
  title: string;
  url: string;
  category: string;
}

interface BookMarkFormProps {
  submitForm: (bookmark: Bookmark, e: FormEvent) => void;
  handleClose: () => void;
}

const BookMarkForm: React.FC<BookMarkFormProps> = ({
  submitForm,
  handleClose,
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Category[]>("http://localhost:8080/categories").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  const optionList = categoryList.map((category) => category.name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !url || !category) {
      return;
    }

    const bookmark: Bookmark = {
      title: title,
      url: url,
      category: category,
    };

    submitForm(bookmark, e);
    handleClose();
    setTitle("");
    setUrl("");
    setCategory("");
  };

  const handleAddCategory = () => {
    if (!newCategory) {
      return;
    }

    const category: Category = {
      name: newCategory,
    };

    axios
      .post<Category>("http://localhost:8080/categories", category)
      .then((res) => {
        setCategoryList([...categoryList, res.data]);
      });
    setNewCategory("");
    setAddCategory(false);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="text-xl font-semibold">Add a Bookmark</div>
        <TextField
          label="Title"
          variant="outlined"
          required
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <TextField
          label="URL"
          variant="outlined"
          required
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />
        <div className="flex gap-4">
          <Autocomplete
            disablePortal
            options={optionList}
            sx={{ width: "18rem" }}
            value={category}
            onChange={(_event: any, newValue: string | null) =>
              setCategory(newValue)
            }
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <button
            className="btn"
            onClick={() => setAddCategory(!addCategory)}
            title="addCategory"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
          </button>
        </div>
        {addCategory && (
          <div className="flex gap-4">
            <TextField
              label="Add Category"
              variant="outlined"
              required
              value={newCategory || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCategory(e.target.value)
              }
            />
            <button className="btn" onClick={handleAddCategory}>
              Add
            </button>
          </div>
        )}
        <Button variant="contained" type="submit">
          Add Bookmark
        </Button>
      </form>
    </>
  );
};

export default BookMarkForm;
