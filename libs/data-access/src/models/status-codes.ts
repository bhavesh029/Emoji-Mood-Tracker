export type StatusCode = {
  code: number;
  desc: string;
};

export const WithContentStatus: StatusCode = {
  code: 200,
  desc: "Ok",
};

export const RedirectStatus: StatusCode = {
  code: 302,
  desc: "Redirect",
};

export const CreatedSuccessfullyStatus: StatusCode = {
  code: 201,
  desc: "Added Successfully",
};

export const NoContentStatus: StatusCode = {
  code: 204,
  desc: "No Content",
};

export const BadRequestFailedStatus: StatusCode = {
  code: 400,
  desc: "Bad Request",
};

export const UnauthorizedStatus: StatusCode = {
  code: 401,
  desc: "Unauthorized",
};

export const ResourceNotFoundStatus: StatusCode = {
  code: 404,
  desc: "Resouce Not Found",
};

export const ResourceAlreadyExistsStatus: StatusCode = {
  code: 409,
  desc: "Resource Already Exists",
};

export const PreconditionFailedStatus: StatusCode = {
  code: 412,
  desc: "Pre-condition Failed",
};

export const InvalidInputStatus: StatusCode = {
  code: 422,
  desc: "Invalid Input",
};

export const ForbiddenStatus: StatusCode = {
  code: 403,
  desc: "Forbidden Status",
};

export const TrigsyBlackListedCode: StatusCode = {
  code: 980,
  desc: "User Blacklisted",
};

export const InternalServerErrorStatus: StatusCode = {
  code: 500,
  desc: "Internal Server Error Status",
};

export const TooManyRequestsStatus: StatusCode = {
  code: 429,
  desc: "Invalid Input",
};
