import callAPI from "../axiosWithConfig";
import { EditProfileType, UpdatePictureType } from "./types";

export async function userProfile() {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/user-service/users/7f127e1d-4fdb-447b-bdde-59097dcbe729`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function editProfile(data: EditProfileType) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/users`;

  return callAPI({
    url,
    method: "PUT",
    token: true,
    data,
  });
}

export async function updatePhoto(data: UpdatePictureType) {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const url = `${ROOT_API}/users/changeprofilepicture`;

  const formData = new FormData();
  formData.append("profile_picture", data.profile_picture[0]);

  return callAPI({
    url,
    method: "POST",
    token: true,
    data: formData,
  });
}
