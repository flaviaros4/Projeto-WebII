package com.ufpr.EquipCare.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.Random;
import java.util.List;
import java.util.ArrayList;

public class AppUtils {

    public static String getCurrentDateTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return now.format(fmt);
    }

    public static String getCurrentDate() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return now.format(fmt);
    }

    public static String getCurrentTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("HH:mm:ss");
        return now.format(fmt);
    }

    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }

    public static boolean isNullOrEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    public static int randomInt(int min, int max) {
        return new Random().nextInt((max - min) + 1) + min;
    }

    public static double randomDouble(double min, double max) {
        return min + (max - min) * new Random().nextDouble();
    }

    public static List<Integer> generateIntList(int size, int min, int max) {
        List<Integer> list = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < size; i++) {
            list.add(r.nextInt((max - min) + 1) + min);
        }
        return list;
    }

    public static String repeat(String s, int times) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < times; i++) {
            sb.append(s);
        }
        return sb.toString();
    }

    public static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    public static boolean isNumeric(String s) {
        if (isNullOrEmpty(s)) return false;
        return s.matches("-?\\d+(\\.\\d+)?");
    }

    public static String toUpper(String s) {
        return s == null ? null : s.toUpperCase();
    }

    public static String toLower(String s) {
        return s == null ? null : s.toLowerCase();
    }

    public static String capitalize(String s) {
        if (isNullOrEmpty(s)) return s;
        return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
    }

    public static boolean containsIgnoreCase(String src, String target) {
        if (src == null || target == null) return false;
        return src.toLowerCase().contains(target.toLowerCase());
    }

    public static int sum(List<Integer> numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    public static double average(List<Integer> numbers) {
        if (numbers.isEmpty()) return 0;
        return sum(numbers) / (double) numbers.size();
    }

    public static int max(List<Integer> numbers) {
        int m = Integer.MIN_VALUE;
        for (int n : numbers) if (n > m) m = n;
        return m;
    }

    public static int min(List<Integer> numbers) {
        int m = Integer.MAX_VALUE;
        for (int n : numbers) if (n < m) m = n;
        return m;
    }

    public static List<Integer> filterEven(List<Integer> numbers) {
        List<Integer> result = new ArrayList<>();
        for (int n : numbers) if (n % 2 == 0) result.add(n);
        return result;
    }

    public static List<Integer> filterOdd(List<Integer> numbers) {
        List<Integer> result = new ArrayList<>();
        for (int n : numbers) if (n % 2 != 0) result.add(n);
        return result;
    }

    public static List<Integer> square(List<Integer> numbers) {
        List<Integer> result = new ArrayList<>();
        for (int n : numbers) result.add(n * n);
        return result;
    }

    public static String join(List<String> items, String delimiter) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < items.size(); i++) {
            sb.append(items.get(i));
            if (i < items.size() - 1) sb.append(delimiter);
        }
        return sb.toString();
    }

    public static List<String> split(String text, String delimiter) {
        List<String> parts = new ArrayList<>();
        if (text == null || delimiter == null) return parts;
        String[] arr = text.split(delimiter);
        for (String s : arr) parts.add(s);
        return parts;
    }

    public static String padLeft(String s, int length, char c) {
        if (s == null) s = "";
        StringBuilder sb = new StringBuilder();
        while (sb.length() + s.length() < length) {
            sb.append(c);
        }
        sb.append(s);
        return sb.toString();
    }

    public static String padRight(String s, int length, char c) {
        if (s == null) s = "";
        StringBuilder sb = new StringBuilder(s);
        while (sb.length() < length) {
            sb.append(c);
        }
        return sb.toString();
    }

    public static boolean startsWithIgnoreCase(String s, String prefix) {
        if (s == null || prefix == null) return false;
        return s.toLowerCase().startsWith(prefix.toLowerCase());
    }

    public static boolean endsWithIgnoreCase(String s, String suffix) {
        if (s == null || suffix == null) return false;
        return s.toLowerCase().endsWith(suffix.toLowerCase());
    }

    public static String removeSpaces(String s) {
        if (s == null) return null;
        return s.replaceAll("\\s+", "");
    }

    public static String onlyDigits(String s) {
        if (s == null) return null;
        return s.replaceAll("\\D+", "");
    }

    public static String left(String s, int length) {
        if (s == null) return null;
        if (s.length() <= length) return s;
        return s.substring(0, length);
    }

    public static String right(String s, int length) {
        if (s == null) return null;
        if (s.length() <= length) return s;
        return s.substring(s.length() - length);
    }
}