"use client"
import { apiSlice } from '../services/apiSlice';

interface Input {
  title: string;
  units: string[];
}

interface Question{
  id: string;
  question:string;
  answer:string;
  options:string;
}

interface Chapter {
  id: string;
  name: string;
  youtubeSearchQuery: string;
  videoId: string | null;
  summary: string | null;
  question:Question[]
}

interface Units {
  id: string;
  name: string;
  chapter: Chapter[];
}

interface Course {
  id: string;
  name: string;
  image: string;
  user?: number | any;
  units: Units[] | any;
}


const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    
    createChapters: builder.mutation({
      query: ({ title, units }: Input) => ({
        url: '/course/createchapter/',
        method: 'POST',
        body: { title, units },
      }),
    }),
    retrieveCourse: builder.query<Course, void>({
      query: () => '/course/courseget/',
    }),
    retrieveCourseById: builder.query<Course,void>({
      query: (courseId) => `/course/courseget/${courseId}/`,
    }),
    getChapterInfo: builder.mutation({
      query: ({ chapterId }: { chapterId: string }) => ({
        url: '/course/chaptergetinfo/',
        method: 'POST',
        body: { chapterId },
      }),
    }),
    
  }),
});

export const {
  useCreateChaptersMutation,
  useRetrieveCourseQuery,
  useRetrieveCourseByIdQuery,
  useGetChapterInfoMutation
} = courseApiSlice;
 


