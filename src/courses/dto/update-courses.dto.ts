import { PartialType } from "@nestjs/mapped-types";
import { CreateCoursesDTO } from "./create-courses.dto";

export class UpdateCoursesDTO extends PartialType(CreateCoursesDTO){

}