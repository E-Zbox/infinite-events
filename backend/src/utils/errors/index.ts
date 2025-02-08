export class AdminError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "AdminError";
    this.status = 401;
  }
}

export class CategoryError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "CategoryError";
    this.status = 401;
  }
}

export class EnvironmentError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "EnvironmentError";
    this.status = 401;
  }
}

export class EventError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "EventError";
    this.status = 401;
  }
}

export class EventAttendeeError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "EventAttendeeError";
    this.status = 401;
  }
}

export class EventCategoryError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "EventCategoryError";
    this.status = 401;
  }
}

export class FileUploadError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "FileUploadError";
    this.status = 401;
  }
}

export class FollowingError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "FollowingError";
    this.status = 401;
  }
}

export class InvalidEnumError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "InvalidEnumError";
    this.status = 401;
  }
}

export class InvalidEmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEmailError";
  }
}

export class LocationError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "LocationError";
    this.status = 401;
  }
}

export class MediaError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "MediaError";
    this.status = 401;
  }
}

export class RequestBodyError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "RequestBodyError";
    this.status = 401;
  }
}

export class RequestURLError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "RequestURLError";
    this.status = 401;
  }
}

export class TokenVerifierError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "TokenVerifierError";
    this.status = 401;
  }
}

export class UserError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "UserError";
    this.status = 401;
  }
}

export class VirtualLocationError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = "VirtualLocationError";
    this.status = 401;
  }
}
