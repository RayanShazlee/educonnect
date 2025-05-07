'use client';

import { useAuth } from '@/lib/auth-context';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCourseManagement, Course } from '@/lib/course-management-context';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

interface CourseForm {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  syllabus: {
    week: number;
    title: string;
    description: string;
  }[];
}

const initialCourseForm: CourseForm = {
  title: '',
  description: '',
  level: 'Beginner',
  duration: '',
  syllabus: [
    {
      week: 1,
      title: '',
      description: ''
    }
  ]
};

export default function DashboardPage() {
  const { user, isEducator, isTeacher } = useAuth();
  const router = useRouter();
  const { addCourse, updateCourse, deleteCourse, getCoursesByInstructor } = useCourseManagement();
  
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<CourseForm>(initialCourseForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if not educator or teacher
    if (!user || (!isEducator() && !isTeacher())) {
      router.push('/');
    }
  }, [user, isEducator, isTeacher, router]);

  // If still loading or not authorized, return null
  if (!user || (!isEducator() && !isTeacher())) {
    return null;
  }

  const instructorCourses = user ? getCoursesByInstructor(user.id) : [];

  const resetForm = () => {
    setCourseForm(initialCourseForm);
    setIsAddingCourse(false);
    setEditingCourseId(null);
  };

  const handleAddSyllabusWeek = () => {
    setCourseForm(prev => ({
      ...prev,
      syllabus: [
        ...prev.syllabus,
        {
          week: prev.syllabus.length + 1,
          title: '',
          description: ''
        }
      ]
    }));
  };

  const handleRemoveSyllabusWeek = (weekIndex: number) => {
    setCourseForm(prev => ({
      ...prev,
      syllabus: prev.syllabus
        .filter((_, index) => index !== weekIndex)
        .map((week, index) => ({ ...week, week: index + 1 }))
    }));
  };

  const handleUpdateSyllabusWeek = (weekIndex: number, field: 'title' | 'description', value: string) => {
    setCourseForm(prev => ({
      ...prev,
      syllabus: prev.syllabus.map((week, index) => 
        index === weekIndex ? { ...week, [field]: value } : week
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);

      const courseData = {
        ...courseForm,
        instructor: user.name || 'Unknown Instructor',
        instructorId: user.id,
        image: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Date.now()}`
      };

      if (editingCourseId) {
        await updateCourse(editingCourseId, courseData);
      } else {
        await addCourse(courseData);
      }

      resetForm();
      toast.success(editingCourseId ? 'Course updated successfully!' : 'Course added successfully!');
    } catch (error) {
      toast.error('Failed to save course');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      syllabus: course.syllabus || [{ week: 1, title: '', description: '' }]
    });
    setIsAddingCourse(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        toast.success('Course deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-press-start">Educator Dashboard</h1>
          <Button
            onClick={() => setIsAddingCourse(!isAddingCourse)}
            className="retro-button"
          >
            {isAddingCourse ? <X className="mr-2" /> : <Plus className="mr-2" />}
            {isAddingCourse ? 'Cancel' : 'Add New Course'}
          </Button>
        </div>

        {isAddingCourse && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-[var(--retro-bg)]/10 p-6 rounded-lg border-2 border-[var(--retro-primary)] mb-8 space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-press-start">Course Title</label>
              <Input
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                className="retro-input"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-press-start">Description</label>
              <Textarea
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                className="retro-input min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-press-start">Level</label>
              <div className="grid grid-cols-3 gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <Button
                    key={level}
                    type="button"
                    variant={courseForm.level === level ? 'default' : 'outline'}
                    onClick={() => setCourseForm({ ...courseForm, level: level as CourseForm['level'] })}
                    className={`font-vt323 ${
                      courseForm.level === level
                        ? 'bg-[var(--retro-primary)] text-[var(--retro-text)]'
                        : 'hover:bg-[var(--retro-primary)]/10'
                    }`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-press-start">Duration (e.g., "4 weeks")</label>
              <Input
                value={courseForm.duration}
                onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                className="retro-input"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-press-start">Course Syllabus</label>
                <Button
                  type="button"
                  onClick={handleAddSyllabusWeek}
                  className="retro-button-secondary"
                >
                  <Plus className="mr-2" /> Add Week
                </Button>
              </div>

              {courseForm.syllabus.map((week, index) => (
                <div key={index} className="space-y-2 p-4 border-2 border-[var(--retro-primary)]/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-press-start text-sm">Week {week.week}</h3>
                    {courseForm.syllabus.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveSyllabusWeek(index)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Input
                    value={week.title}
                    onChange={(e) => handleUpdateSyllabusWeek(index, 'title', e.target.value)}
                    placeholder="Week Title"
                    className="retro-input"
                    required
                  />
                  
                  <Textarea
                    value={week.description}
                    onChange={(e) => handleUpdateSyllabusWeek(index, 'description', e.target.value)}
                    placeholder="Week Description"
                    className="retro-input"
                    required
                  />
                </div>
              ))}
            </div>

            <Button type="submit" className="retro-button w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingCourseId ? 'Update Course' : 'Add Course'}
            </Button>
          </motion.form>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-press-start mb-4">Your Courses</h2>
          {instructorCourses.length === 0 ? (
            <div className="text-center py-8 bg-[var(--retro-bg)]/10 rounded-lg border-2 border-[var(--retro-primary)]">
              <p className="font-vt323 text-xl mb-4">You haven't created any courses yet</p>
              <Button onClick={() => setIsAddingCourse(true)} className="retro-button">
                Create Your First Course
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {instructorCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--retro-bg)]/10 p-6 rounded-lg border-2 border-[var(--retro-primary)]"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-press-start text-xl mb-2">{course.title}</h3>
                      <p className="font-vt323 text-lg opacity-80 mb-4">{course.description}</p>
                      <div className="flex gap-4 font-vt323">
                        <span className="text-[var(--retro-primary)]">{course.level}</span>
                        <span>{course.duration}</span>
                        <span>{course.enrolled} students</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditCourse(course)}
                        className="retro-button-secondary"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCourse(course.id)}
                        variant="destructive"
                        className="bg-[var(--retro-accent)]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}